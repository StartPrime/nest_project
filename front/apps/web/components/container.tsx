import { cn } from '@workspace/ui/lib/utils'

interface Props {
	children?: React.ReactNode
	classes?: string
}

export default function Container({ children, classes }: Props) {
	return <div className={cn('max-w-[1110px] m-auto', classes)}>{children}</div>
}
