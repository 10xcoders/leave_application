import Client from "../database";

export interface LeaveApplication {
  id?: number;
  employee_id: number;
  start_date: Date;
  end_date: Date;
  reason: string;
  status: string;
  leave_type_id: number;
}

export class LeaveApplicationStore {
  // GET All leave applications from DB
  async index(): Promise<LeaveApplication[]> {
    try {
      const sql = "SELECT * FROM leave_applications";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get leave applications. Error: ${err}`);
    }
  }

  // GET one leave application according to id from DB
  async show(id: number): Promise<LeaveApplication> {
    try {
      const sql = "SELECT * FROM leave_applications WHERE id = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't show leave application. Error: ${err}`);
    }
  }

  // POST/ADD a new leave application to DB
  async create(la: LeaveApplication): Promise<LeaveApplication> {
    try {
      const sql =
        "INSERT INTO leave_applications (employee_id, start_date, end_date, reason, status, leave_type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        la.employee_id,
        la.start_date,
        la.end_date,
        la.reason,
        la.status,
        la.leave_type_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't add leave application. Error: ${err}`);
    }
  }

  // UPDATE a leave application in DB
  async update(id: number, la: LeaveApplication): Promise<LeaveApplication> {
    try {
      const sql =
        "UPDATE leave_applications SET employee_id = $1, start_date = $2, end_date = $3, reason = $4, status = $5, leave_type_id = $6 WHERE id = $7 RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        la.employee_id,
        la.start_date,
        la.end_date,
        la.reason,
        la.status,
        la.leave_type_id,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't update leave application: Error ${err}`);
    }
  }

  // DELETE a leave application FROM DB according to id
  async delete(id: number): Promise<LeaveApplication> {
    try {
      const sql = "DELETE FROM leave_applications WHERE id = ($1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't delete leave application. Error: ${err}`);
    }
  }

  // GET all leave applications for a specific employee
  async getLeaveApplicationsByEmployee(
    employee_id: number
  ): Promise<LeaveApplication[]> {
    try {
      const sql = "SELECT * FROM leave_applications WHERE employee_id = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [employee_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get leave applications by employee. Error: ${err}`
      );
    }
  }

  // GET all leave applications of a specific type
  async getLeaveApplicationsByType(
    leave_type_id: number
  ): Promise<LeaveApplication[]> {
    try {
      const sql = "SELECT * FROM leave_applications WHERE leave_type_id = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [leave_type_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get leave applications by type. Error: ${err}`);
    }
  }
}
