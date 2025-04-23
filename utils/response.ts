// utils/response.ts
export const successResponse = <T>(data: T, message = "Success") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (
  message = "Something went wrong",
  status = 500
) => ({
  success: false,
  message,
  status,
});
