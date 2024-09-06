"use client";

import {
	useCreateNewsHook
} from '@/hooks/news.hooks';
import {
	useUploadFileHook,
} from '@/hooks/files.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEditorStore } from '@/stores/useEditorStore';
import Image from 'next/image';
import NewsPreview from '@/components/NewsPreview/page';

const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});

const IdEditNews = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const [isPreview, setIsPreview] = useState<boolean>(false);

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = useState<string>('');
	const [createdAt, setCreatedAt] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);

	const {
		createNews,
		isLoading: isCreatingNews,
		error: createNewsError,
		response: createNewsResponse,
	} = useCreateNewsHook();

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
		if (createNewsResponse) {
			router.back();
		}
	}, [createNewsResponse]);

	useEffect(() => {
		if (uploadFileResponse) {
			onCreateNews(uploadFileResponse.fileName);
		}
	}, [uploadFileResponse]);

	function onCreateNewsClicked() {
		if (uploadedImage) {
			uploadFile(uploadedImage as File, params.id, 'news');
		} else {
			onCreateNews();
		}
	}

	function onCreateNews(name: string | null = null) {
		createNews({
			title,
			author,
			description,
			image: name ?? '' ?? undefined,
			content: JSON.stringify(editorData),
		});
	}

	return (
		<main>
			<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
				<h1 className="text-xl font-semibold text-gray-800 mb-4">Create News</h1>
				<div className="space-y-4">

					{isPreview ? (
						<NewsPreview news={{ title, author, description, image, createdAt }} />
					) : (
						<>
							<div>
								<label htmlFor="title" className="block text-gray-700 font-medium mb-1 text-sm">Title</label>
								<input
									id="title"
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="author" className="block text-gray-700 font-medium mb-1 text-sm">Author</label>
								<input
									id="author"
									type="text"
									value={author}
									onChange={(e) => setAuthor(e.target.value)}
									className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
								/>
							</div>

							<div>
								<label htmlFor="description" className="block text-gray-700 font-medium mb-1 text-sm">Description</label>
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

								{image && !uploadedImage && (
									<div className="mb-4">
										<Image
											width={400}
											height={400}
											src={"/images/news/" + image}
											alt="Current preview"
											className="w-24 h-24 object-cover rounded-md border border-gray-300"
										/>
									</div>
								)}

								{image && uploadedImage && (
									<div className="mb-4">
										<Image
											width={400}
											height={400}
											src={image}
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
									<Editor holder="editorjs-container" content={editorData} />
								</div>
							</div>

						</>
					)}

					<div className="text-right space-x-2">
						<button
							onClick={() => isPreview ? setIsPreview(false) : setIsPreview(true)}
							className="px-4 py-2 text-sm text-white bg-gray-600 hover:bg-gray-700 rounded-md"
						>
							{isPreview ? 'Edit' : 'Preview'}
						</button>
						<button
							onClick={onCreateNewsClicked}
							className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
							disabled={isCreatingNews || isUploadingFile}
						>
							{(isCreatingNews || isUploadingFile) ? 'Creating...' : 'Creating News'}
						</button>
					</div>
				</div>
			</div>
		</main>
	);

};

export default IdEditNews;
