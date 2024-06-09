import NextImage from 'next/image'
import type { ComicResponseData } from '@/types'
import { get4x3ImageHeight } from '@/lib/image-utils'
import { createLink } from '@/lib/xkcd-utils'
import DataField from '@/components/DataField'

interface ComicsProps extends ComicResponseData {
    width?: number
    height?: number
    withDetails?: boolean
    withImageLink?: boolean
}

const DEFAULT_WIDTH = 512

const Comics = (props: ComicsProps) => {
    const {
        month,
        num,
        link,
        year,
        news,
        safe_title,
        transcript,
        alt,
        img,
        title,
        day,
        width = DEFAULT_WIDTH,
        height = get4x3ImageHeight(DEFAULT_WIDTH),
        withDetails = false,
        withImageLink = false,
    } = props

    const imageCreationDate = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
    ).toLocaleDateString()

    return (
        <div className="flex w-full flex-col gap-y-4">
            <a
                href={withImageLink ? `/comics/${num}` : '#'}
                className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
            >
                <NextImage
                    src={img}
                    alt={alt}
                    width={width}
                    height={height}
                    className="object-contain group-hover:opacity-75"
                />
                <span className="sr-only">View details for {title || safe_title}</span>
            </a>
            {withDetails && (
                <>
                    <DataField label="Created at">
                        <p className="text-sm">{imageCreationDate}</p>
                    </DataField>
                    {title && (
                        <DataField label="Title">
                            <p className="text-sm">{title}</p>
                        </DataField>
                    )}
                    {safe_title && (
                        <DataField label="Order number">
                            <p className="text-sm">{num}</p>
                        </DataField>
                    )}
                    <DataField label="Created at">
                        <p className="text-sm">{imageCreationDate}</p>
                    </DataField>
                    <DataField label="Link to post">
                        <a className="text-sm" href={createLink({ num, link })}>
                            {createLink({ num, link })}
                        </a>
                    </DataField>
                    {news && (
                        <DataField label="News">
                            <p className="text-sm">{news}</p>
                        </DataField>
                    )}
                    {transcript && (
                        <DataField label="Transcript">
                            <p className="text-sm">{transcript}</p>
                        </DataField>
                    )}
                </>
            )}
        </div>
    )
}

export default Comics
