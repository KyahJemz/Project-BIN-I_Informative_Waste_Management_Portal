import { Model, Schema } from "mongoose";
import { IRoutesDocument } from "@/models/routes";
import { ICreateRoutesRequest, IUpdateRoutesRequest } from "@/validation/routes.validation";
import { RouteStatusEnum } from "@/enums/routeStatus.enum";
export class RoutesService {
    constructor(private readonly routesModel: Model<IRoutesDocument>) {}
    
    async createRoute (request: ICreateRoutesRequest) {
        try {
            const routes = await this.routesModel.create(request);
            if (!routes) {
                throw new Error('Routes creation failed');
            }
            return routes;
        } catch (error) {
            throw error;
        }
    }
    async getRouteById (id: string) {
        try {
            const routes = await this.routesModel.findOne({ _id: id, deletedAt: null }).lean();
            if (!routes) {
                throw new Error('No routes found');
            }
            return routes;
        } catch (error) {
            throw error;
        }
    }
    async getAllRoutes () {
        try {
            const routes = await this.routesModel.find({deletedAt: null}).lean();
            if (!routes) {
                throw new Error('No routes found');
            }
            return routes;
        } catch (error) {
            throw error;
        }
    }
    async getRouteByScheduleId (id: string) {
        try {
            const routes = await this.routesModel.findOne({ schedule_id: id, deletedAt: null }).lean();
            if (!routes) {
                throw new Error('No routes found');
            }
            return routes;
        } catch (error) {
            throw error;
        }
    }
    async updateRoute(id: string, request: IUpdateRoutesRequest) {
        try {
            const routes = await this.routesModel.findById(id);
            if (!routes) {
                throw new Error('Routes not found');
            }
            if (request.schedule_id !== undefined) {
                routes.schedule_id = new Schema.Types.ObjectId(request.schedule_id);
            }
            if (request.routeName !== undefined) {
                routes.routeName = request.routeName;
            }
            if (request.pickupPoints !== undefined) {
                routes.pickupPoints = request.pickupPoints;
            }
            if (request.description !== undefined) {
                routes.description = request.description;
            }
            if (request.status !== undefined) {
                routes.status = request.status as RouteStatusEnum;
            }
            if (request.notes !== undefined) {
                routes.notes = request.notes;
            }
            const updatedRoutes = await routes.save();
            return updatedRoutes.toObject(); 
        } catch (error) {
            throw error;
        }
    }
    async deleteRoute (id: string) {
        const routes = await this.routesModel.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true }).lean();
        try {
            return routes;
        } catch (error) {
            throw error;
        }
    }
}