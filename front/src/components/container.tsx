interface Props {
	children?: React.ReactNode
	classes?: string
}

export default function Container({ children, classes }: Props) {
	return (
		<div className={`m-auto max-w-[1100px] px-4 ${classes}`}>{children}</div>
	)
}
