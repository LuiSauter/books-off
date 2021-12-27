/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import onExpandableTextareaInput from 'src/config/textarea'
import { categorys } from 'src/assets/data/category'
import { useMutation } from '@apollo/client'
import { ADD_POST } from 'src/post/graphql-mutations'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

if (typeof window !== 'undefined') {
  const description = document.getElementById('description') || null
  description?.addEventListener('input', onExpandableTextareaInput)
}

const New = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormInputs>()
  const [fileImage, setFileImage] = useState<string | any>('')
  const { data: session } = useSession()
  const router = useRouter()
  const [newPostWithBook] = useMutation(ADD_POST)

  const handleChangeFile = (data: FileList | any) => {
    const file = data[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    return (fileReader.onload = (e) => {
      const imgSrc = e.target?.result
      return setFileImage(imgSrc)
    })
  }
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const hasLength = data.description.split('\n')
    newPostWithBook({
      variables: {
        title: data.title,
        description: hasLength,
        email: session?.user?.email,
        bookUrl: data.book,
        image: fileImage,
        tags: [...data.tags],
      },
    })
    return router.push('/home')
  }

  return (
    <>
      <section className="flex flex-col sm:mx-auto my-4 gap-4 bg-secondary py-4 px-6 sm:min-w-minForm sm:mt-0 w-full rounded-xl">
        <article className="w-full m-auto sm:min-w-minForm">
          <header className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">Create new book</h2>
            <hr className="border-secondaryLigth border-b-2 rounded-lg" />
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <label className="font-semibold">
              Add an image <span className="text-thirdBlue">* </span>
              {errors.img?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.img.message}
                </span>
              )}
              <Controller
                control={control}
                name="img"
                rules={{
                  required: {
                    value: true,
                    message: 'This image is required',
                  },
                }}
                render={({ field: { onChange } }) => (
                  <input
                    className="flex p-1 mt-1 w-full rounded-md hover:bg-secondaryLigth transition-colors focus:outline-none focus:ring-4 focus:border-thirdBlue"
                    onChange={(e) => {
                      handleChangeFile(e.target.files)
                      onChange(e)
                    }}
                    type="file"
                    accept="image/*"
                    placeholder="drive.google.com/example"
                  />
                )}
              />
            </label>
            {fileImage && (
              <img
                className="m-auto rounded-lg mt-2 w-full shadow-lg"
                src={fileImage}
              />
            )}
            <label className="font-semibold">
              Title <span className="text-thirdBlue">* </span>
              {errors.title?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.title.message}
                </span>
              )}
              <input
                className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 "
                {...register('title', {
                  required: {
                    value: true,
                    message: 'title is required',
                  },
                })}
                type="text"
                placeholder="Write a title"
              />
            </label>
            <label className="font-semibold">
              Description <span className="text-thirdBlue">* </span>
              {errors.description?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.description.message}
                </span>
              )}
              <textarea
                className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue overflow-hidden resize-none"
                {...register('description', {
                  required: {
                    value: true,
                    message: 'Description is required',
                  },
                })}
                rows={3}
                data-min-rows={3}
                id="description"
                placeholder="Write a description"
              />
            </label>
            <label className="font-semibold">
              Book in google drive <span className="text-thirdBlue">* </span>
              {errors.book?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.book.message}
                </span>
              )}
              <input
                className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200"
                {...register('book', {
                  required: {
                    value: true,
                    message: 'This field is required to google drive',
                  },
                })}
                type="text"
                placeholder="drive.google.com/example"
              />
            </label>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 justify-evenly gap-2">
              {categorys.map((category: string, index: number) => (
                <label key={index} className="font-medium flex items-center">
                  <input
                    type="checkbox"
                    value={category}
                    className="accent-sky-600 mr-1 h-4 w-4"
                    {...register('tags')}
                  />
                  {category}
                </label>
              ))}
            </div>
            <label className="text-textGray text-base">
              <span className="text-thirdBlue">*</span> fields required
            </label>
            <button className="bg-blue-500 py-1 rounded-md mb-2 hover:bg-thirdBlue focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200">
              submit
            </button>
          </form>
        </article>
      </section>
    </>
  )
}

export default New