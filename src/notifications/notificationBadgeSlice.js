// ✅ NotificationBadgeSlice.js (yeni dosya oluştur)
import { createSlice } from "@reduxjs/toolkit";

const notificationBadgeSlice = createSlice({
  name: "notificationBadge",
  initialState: {
    unreadCount: 0,
  },
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  },
});

export const { setUnreadCount } = notificationBadgeSlice.actions;
export default notificationBadgeSlice.reducer;


