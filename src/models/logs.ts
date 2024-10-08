import { ActionsEnum } from '@/enums/actions.enum';
import { CollectionsEnum } from '@/enums/collections.enum';
import { ILog } from '@/types/ILog.dto';
import mongoose, { Schema } from 'mongoose';
import AccountModel from './accounts';

export interface ILogDocument extends ILog, Document {}

const logsSchema: Schema<ILogDocument> = new Schema(
	{
		account_id: {
			type: Schema.Types.ObjectId,
			ref: AccountModel,
			required: true,
		},
		actionCollection: {
			type: String,
			enum: Object.values(CollectionsEnum),
			required: true,
		},
		action: {
			type: String,
			enum: Object.values(ActionsEnum),
			required: true,
		},
		action_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		newDocument: {
			type: String,
			required: false,
		},
		oldDocument: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const LogsModel =
	mongoose.models.Logs ||
	mongoose.model<ILogDocument>('Logs', logsSchema);

export default LogsModel;
