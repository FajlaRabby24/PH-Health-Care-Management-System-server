import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { adminServices } from "./admin.service";

// * get all admin
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.getAllAdmins();
  sendResponse(res, status.OK, true, "Admins fetched successfully", result);
});

// * get admin by id
const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.getAdminById(req.params.adminId as string);
  sendResponse(res, status.OK, true, "Admin fetched successfully", result);
});

// * update admin by id
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await adminServices.updateAdmin(
    req.params.adminId as string,
    payload,
  );
  sendResponse(res, status.OK, true, "Admin update successfully", result);
});

// * soft delete admin by id
const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.softDeleteAdmin(
    req.params.adminId as string,
    req.user,
  );
  sendResponse(res, status.OK, true, "Admin deleted successfully", result);
});

// * change user status
const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;
  const result = await adminServices.changeUserStatus(user, payload);
  sendResponse(res, status.OK, true, "User changed successfully", result);
});

// * change user role
const changeUserRole = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = req.body;
  const result = await adminServices.changeUserRole(user, payload);
  sendResponse(res, status.OK, true, "User role changed successfully", result);
});

export const adminController = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
  changeUserStatus,
  changeUserRole,
};
