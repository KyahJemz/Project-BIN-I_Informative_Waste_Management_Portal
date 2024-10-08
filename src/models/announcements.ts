import { IAnnouncement } from '@/types/IAnnouncement.dto';
import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncementDocument extends IAnnouncement, Document {}

const announcementsSchema: Schema<IAnnouncementDocument> = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: false,
		},
		image: {
			type: String,
			required: false,
		},
		deletedAt: {
			type: Date,
			default: null,
		}
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const AnnouncementsModel =
	mongoose.models.Announcement ||
	mongoose.model<IAnnouncementDocument>('Announcement', announcementsSchema);

export default AnnouncementsModel;
