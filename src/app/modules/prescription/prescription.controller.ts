import { Request, Response } from "express";
import { status } from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { PrescriptionService } from "./prescription.service";

const givePrescription = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;
  const result = await PrescriptionService.givePrescription(user, payload);
  sendResponse(
    res,
    status.CREATED,
    true,
    "Prescription created successfully",
    result,
  );
});

const myPrescriptions = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await PrescriptionService.myPrescriptions(user);
  sendResponse(
    res,
    status.OK,
    true,
    "Prescription fetched successfully",
    result,
  );
});

const getAllPrescriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await PrescriptionService.getAllPrescriptions();
  sendResponse(
    res,
    status.OK,
    true,
    "Prescription retrieval successfully",
    result,
  );
});

const updatePrescription = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const prescriptionId = req.params.id;
  const payload = req.body;
  const result = await PrescriptionService.updatePrescription(
    user,
    prescriptionId as string,
    payload,
  );
  sendResponse(
    res,
    status.OK,
    true,
    "Prescription updated successfully",
    result,
  );
});

const deletePrescription = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const prescriptionId = req.params.id;
  await PrescriptionService.deletePrescription(user, prescriptionId as string);
  sendResponse(res, status.OK, true, "Prescription deleted successfully");
});

export const PrescriptionController = {
  givePrescription,
  myPrescriptions,
  getAllPrescriptions,
  updatePrescription,
  deletePrescription,
};
