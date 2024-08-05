import express, { Request, Response } from "express";
import { LeaveApplicationStore } from "../models/leave_application";

const store = new LeaveApplicationStore();

const index = async (_req: Request, res: Response) => {
  try {
    const leaveApplications = await store.index();
    res.json(leaveApplications);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const leaveApplication = await store.show(parseInt(req.params.id));
    res.json(leaveApplication);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const leaveApplication = {
    employee_id: parseInt(req.body.employee_id),
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    reason: req.body.reason,
    status: req.body.status,
    leave_type: req.body.leave_type,
  };

  try {
    const newLeaveApplication = await store.create(leaveApplication);
    res.json(newLeaveApplication);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const leaveApplicationRoutes = (app: express.Application) => {
  app.get("/leave_applications", index);
  app.get("/leave_applications/:id", show);
  app.post("/leave_applications", create);
};

export default leaveApplicationRoutes;
