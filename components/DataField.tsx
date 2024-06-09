import { ReactNode } from 'react'

interface DataFieldProps {
    label: string
    children: ReactNode
}

const DataField = ({ label, children }: DataFieldProps) => {
    return (
        <div className="mb-2 flex flex-col">
            <div className="text-xs font-semibold">{label}</div>
            <div className="rounded-md border-0">{children}</div>
        </div>
    )
}

export default DataField
