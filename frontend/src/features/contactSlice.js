import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

// ✅ Fetch all messages (Admin)
export const fetchMessages = createAsyncThunk("messages/fetchMessages", async () => {
  const res = await axiosInstants.get("/contact");
  return res.data.messages;
});

// ✅ Send a new message (Contact form)
export const sendMessage = createAsyncThunk("messages/sendMessage", async (data) => {
  const res = await axiosInstants.post("/contact", data);
  if (res.data.success) {
    toast.success(res.data.message || "Message sent successfully!");
  } else {
    toast.error(res.data.error || "Failed to send message");
  }
  return res.data;
});

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📬 Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 📩 Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
