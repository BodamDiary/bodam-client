'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ImageIcon, X, Plus } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useDropzone } from 'react-dropzone'

interface UploadedImage {
    id: string
    url: string
    file: File
}

interface DiaryImageUploadProps {
    onImageChange: (files:File[]) => void;
}
const DiaryImageUpload = ({onImageChange} : DiaryImageUploadProps) => {
    const [images, setImages] = useState<UploadedImage[]>([])
    const [showDropzone, setShowDropzone] = useState(true)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            id: uuidv4(),
            url: URL.createObjectURL(file),
            file
        }))
        setImages(prev => [...prev, ...newImages])
        setShowDropzone(false)
        onImageChange(acceptedFiles)
    }, [onImageChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} })

    const removeImage = (id: string) => {
        setImages(prev => {
            const imageToRemove = prev.find(img => img.id === id)
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.url)
            }

            const filteredImages = prev.filter(img => img.id !== id);
            onImageChange(filteredImages.map(img => img.file));
            return filteredImages;
        })
        if (images.length === 1) {
            setShowDropzone(true)
        }
    }

    const addMoreImages = () => {
        setShowDropzone(true)
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            {showDropzone && (
                <div
                    {...getRootProps()}
                    className={`p-4 mb-4 rounded-lg border-2 border-dashed ${
                        isDragActive ? 'border-main_200 bg-main_200/10' : 'border-main_300 bg-main_100]'
                    } hover:bg-main_100 transition-colors cursor-pointer`}
                >
                    <input {...getInputProps()} />
                    <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-[#B4DBFF]" />
                        <p className="mt-2 text-sm text-gray-500">
                            {isDragActive ? '이미지를 여기에 놓으세요' : '이미지를 드래그하여 놓거나 클릭하여 선택하세요'}
                        </p>
                    </div>
                </div>
            )}
            <div className="relative">
                <div className="flex overflow-x-auto space-x-4">
                    {images.map(image => (
                        <div key={image.id} className="relative flex-shrink-0 w-28 h-28">
                            <Image
                                src={image.url}
                                alt="Uploaded preview"
                                fill
                                className="object-cover rounded-lg"
                            />
                            <Button
                                onClick={() => removeImage(image.id)}
                                variant="destructive"
                                size="icon"
                                className="absolute top-0 right-0 z-20"
                            >
                                <X className="h-1 w-1" />
                                <span className="sr-only">이미지 제거</span>
                            </Button>
                        </div>
                    ))}
                    {images.length > 0 && (
                        <Button
                            onClick={addMoreImages}
                            variant="outline"
                            className="flex-shrink-0 w-32 h-32"
                        >
                            <Plus className="h-6 w-6" />
                            <span className="ml-2">추가</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DiaryImageUpload

