"use client";

import {
	useCreateEventHook
} from '@/hooks/events.hooks';
import {
	useUploadFileHook,
} from '@/hooks/files.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEditorStore } from '@/stores/useEditorStore';
import Image from 'next/image';
import EventPreview from '@/components/EventPreview/page';

const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});

const IdEditEvent = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const [isPreview, setIsPreview] = useState<boolean>(false);

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = useState<string>('');
	const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().toString());
	const [author, setAuthor] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [eventStartTime, setEventStartTime] = useState<string>('');
	const [eventEndTime, setEventEndTime] = useState<string>('');
	const [eventDate, setEventDate] = useState<string>('');
	const [eventLocation, setEventLocation] = useState<string>('');
	const [status, setStatus] = useState<string>('upcoming');
	const [content, setContent] = useState(null);

	const {
		createEvent,
		isLoading: isCreatingEvent,
		error: createEventError,
		response: createEventResponse,
	} = useCreateEventHook();

	const {
		uploadFile,
		isLoading: isUploadingFile,
		error: uploadFileError,
		response: uploadFileResponse,
	} = useUploadFileHook();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setUploadedImage(file);
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		if (createEventResponse) {
			router.back();
		}
		// eslint-disable-next-line
	}, [createEventResponse]);

	useEffect(() => {
		if (uploadFileResponse) {
			onCreateEvent(uploadFileResponse.fileName);
		}
		// eslint-disable-next-line
	}, [uploadFileResponse]);

	function onCreateEventClicked() {
		if (uploadedImage) {
			uploadFile(uploadedImage as File, params.id, 'events');
		} else {
			onCreateEvent();
		}
	}

	function onCreateEvent(name: string | null = null) {
		createEvent({
			title,
			author,
			content,
			description,
			eventDate,
			eventTime: `${eventStartTime} - ${eventEndTime}`,
			eventLocation,
			status,
			image: name ?? undefined,
			content: JSON.stringify(editorData),
		});
	}

	return (
		<main>
			<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
				<h1 className="text-xl font-semibold text-gray-800 mb-4">Create Event</h1>
				<div className="space-y-4 border-t">

					{isPreview ? (
						<EventPreview event={{ title, author, description, image, createdAt }} />
					) : (
						<>
							<div>
								<label htmlFor="title" className="block text-gray-700 font-medium mb-1 text-sm mt-4">Title<a className="text-red-500"> *</a></label>
								<input
									id="title"
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="author" className="block text-gray-700 font-medium mb-1 text-sm">Author<a className="text-red-500"> *</a></label>
								<input
									id="author"
									type="text"
									value={author}
									onChange={(e) => setAuthor(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="eventDate" className="block text-gray-700 font-medium mb-1 text-sm">Event Date<a className="text-red-500"> *</a></label>
								<input
									id="eventDate"
									type="date"
									value={eventDate}
									onChange={(e) => setEventDate(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="eventStartTime" className="block text-gray-700 font-medium mb-1 text-sm">Event Start Time<a className="text-red-500"> *</a></label>
								<input
									id="eventStartTime"
									type="time"
									value={eventStartTime}
									onChange={(e) => setEventStartTime(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="eventEndTime" className="block text-gray-700 font-medium mb-1 text-sm">Event End Time<a className="text-red-500"> *</a></label>
								<input
									id="eventEndTime"
									type="time"
									value={eventEndTime}
									onChange={(e) => setEventEndTime(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="eventLocation" className="block text-gray-700 font-medium mb-1 text-sm">Event Location<a className="text-red-500"> *</a></label>
								<input
									id="eventLocation"
									type="text"
									value={eventLocation}
									onChange={(e) => setEventLocation(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="description" className="block text-gray-700 font-medium mb-1 text-sm">Description<a className="text-red-500"> *</a></label>
								<input
									id="description"
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="image" className="block text-gray-700 font-medium mb-1 text-sm">Image</label>

								{image && (
									<div className="mb-4">
										<Image
											key={"image"}
											width={400}
											height={400}
											src={uploadedImage ? image : `/images/events/${image}`}
											alt="Current preview"
											className="w-24 h-24 object-cover rounded-md border border-gray-300"
										/>
									</div>
								)}

								<label htmlFor="file-upload" className="block text-gray-700 font-medium mb-1 text-sm">Upload New Image</label>
								<input
									id="file-upload"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer text-sm"
								/>
							</div>

							<div className="mb-4">
								<h2 className="text-sm font-semibold text-gray-800 mb-2">Content</h2>
								<div className="border border-gray-300 rounded-md p-2">
									<Editor holder="editorjs-container" content={editorData ?? []} />
								</div>
							</div>

						</>
					)}

					<div className="flex justify-end gap-4">
						{isPreview ? null : (
							<button
								onClick={() => router.back()}
								className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
								disabled={isCreatingEvent || isUploadingFile}
							>
								Go Back
							</button>
						)}
						<button
							onClick={() => isPreview ? setIsPreview(false) : setIsPreview(true)}
							className="font-semibold bg-gray-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
						>
							{isPreview ? 'Edit' : 'Preview'}
						</button>
						{isPreview ? null : (
							<button
								onClick={onCreateEventClicked}
								className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
								disabled={isCreatingEvent || isUploadingFile}
							>
								{(isCreatingEvent || isUploadingFile) ? 'Creating...' : 'Creating Event'}
							</button>
						)}
					</div>
				</div>
			</div>
		</main>
	);

};

export default IdEditEvent;
