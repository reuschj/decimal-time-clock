import type { FC } from "react";

interface SeparatorProps {
	char?: string;
	visible?: boolean;
}

/** Component for separator element between time components on a digital display */
export const Separator: FC<SeparatorProps> = ({
	char = ":",
	visible = true,
}: SeparatorProps) => (
	<div className="display-component display-chars separator">
		{visible ? char : null}
	</div>
);

export default Separator;
