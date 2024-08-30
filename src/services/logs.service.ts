import { Model, Schema } from 'mongoose';
import { ILogDocument } from '@/models/logs';
import {
	ICreateLogsRequest,
} from '@/validation/logs.validation';

export class LogsService {
	constructor(private readonly logsModel: Model<ILogDocument>) {}

	async createLogs(request: ICreateLogsRequest) {
		try {
			const parsedRequest = {
				...request,
				account_id: '66cedc33c4dcd2eafbe55f6e',
				action_id: request.action_id,
			}
			const logs = await this.logsModel.create(parsedRequest);
			if (!logs) {
				throw new Error('Logs creation failed');
			}
			return logs;
		} catch (error) {
			throw error;
		}
	}
	async getLogsById(id: string) {
		try {
			const logs = await this.logsModel.findOne({ _id: id }).lean();
			if (!logs) {
				throw new Error('No log found');
			}
			return logs;
		} catch (error) {
			throw error;
		}
	}
	async getAllLogs() {
		try {
			const logs = await this.logsModel.find().lean();
			if (!logs) {
				throw new Error('No logs found');
			}
			return logs;
		} catch (error) {
			throw error;
		}
	}
}
