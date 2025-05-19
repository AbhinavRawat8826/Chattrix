import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
  markFriendRequestsAsSeen,
  rejectFriendRequest,
  countFriendRequestNotifications
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);
router.patch("/friend-requests/seen", markFriendRequestsAsSeen); 
router.get("/friend-requests/count", countFriendRequestNotifications);

router.patch("/friend-requests/reject/:id", rejectFriendRequest);

export default router;
