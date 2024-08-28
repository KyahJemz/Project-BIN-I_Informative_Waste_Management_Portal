import { Model, Schema } from "mongoose";
import { IScheduleDocument } from "@/models/schedules";
import { ICreateScheduleRequest, IUpdateScheduleRequest } from "@/validation/schedule.validation";

export class ScheduleService {
    constructor(private readonly scheduleModel: Model<IScheduleDocument>) {}
    
    async createSchedule (request: ICreateScheduleRequest) {
        try {
            const schedule = await this.scheduleModel.create(request);
            if (!schedule) {
                throw new Error('Schedule creation failed');
            }
            return schedule;
        } catch (error) {
            throw error;
        }
    }
    async getScheduleById (id: string) {
        try {
            const schedule = await this.scheduleModel.findOne({ _id: id, deletedAt: null }).lean();
            if (!schedule) {
                throw new Error('No schedule found');
            }
            return schedule;
        } catch (error) {
            throw error;
        }
    }
    async getAllSchedules () {
        try {
            const schedule = await this.scheduleModel.find({deletedAt: null}).lean();
            if (!schedule) {
                throw new Error('No schedules found');
            }
            return schedule;
        } catch (error) {
            throw error;
        }
    }
    async updateSchedule(id: string, request: IUpdateScheduleRequest) {
        try {
            const schedule = await this.scheduleModel.findById(id);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            if (request.schedule !== undefined) {
                schedule.schedule = request.schedule;
            }
            if (request.scheduleLocation !== undefined) {
                schedule.scheduleLocation = request.scheduleLocation;
            }
            if (request.wasteType !== undefined) {
                schedule.wasteType = request.wasteType;
            }
            if (request.status !== undefined) {
                schedule.status = request.status;
            }
            if (request.notes !== undefined) {
                schedule.notes = request.notes;
            }
            const updatedSchedule = await schedule.save();
            return updatedSchedule.toObject(); 
        } catch (error) {
            throw error;
        }
    }
    async deleteSchedule (id: string) {
        const schedule = await this.scheduleModel.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true }).lean();
        try {
            return schedule;
        } catch (error) {
            throw error;
        }
    }
}