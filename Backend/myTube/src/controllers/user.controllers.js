import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate access and refresh token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  // validation
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  // upload avatar to cloudinary (optional)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  let avatarUrl = null;

  if (avatarLocalPath) {
    try {
      const avatar = await uploadToCloudinary(avatarLocalPath);
      console.log("Uploaded avatar to cloudinary", avatar);
      avatarUrl = avatar.url;
    } catch (error) {
      console.log("Error uploading avatar", error);
      // Don't fail registration if avatar upload fails
      console.log("Continuing registration without avatar");
    }
  }

  try {
    const user = await User.create({
      fullname,
      email,
      username: username.toLowerCase(),
      password,
      ...(avatarUrl && { avatar: avatarUrl }),
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Failed to create user while saving to database");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", createdUser));
  } catch (error) {
    console.log("user creation error", error);
    // Clean up uploaded avatar if user creation fails
    if (avatarUrl) {
      try {
        // Extract public_id from the avatar URL to delete from cloudinary
        const publicId = avatarUrl.split("/").pop().split(".")[0];
        await deleteFromCloudinary(publicId);
      } catch (cleanupError) {
        console.log("Error cleaning up avatar:", cleanupError);
      }
    }
    throw new ApiError(500, "Failed to create user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from body
  const { email, password, username } = req.body;

  // validation
  if (!email && !username) {
    throw new ApiError(400, "Email or username is required");
  }

  // Convert username to lowercase if provided (since usernames are stored in lowercase)
  const searchUsername = username ? username.toLowerCase() : undefined;
  const searchEmail = email ? email.toLowerCase() : undefined;

  const user = await User.findOne({
    $or: [
      ...(searchEmail ? [{ email: searchEmail }] : []),
      ...(searchUsername ? [{ username: searchUsername }] : []),
    ],
  });

  if (!user) {
    throw new ApiError(400, "Invalid email or username");
  }

  // validate password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid refresh token : expired or wrong");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Failed to refresh access token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "Current user retrieved successfully")
    );
});

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getCurrentUser,
};
