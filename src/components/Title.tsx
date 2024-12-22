import { JSX } from 'preact/jsx-runtime'

type TitleProps = {
  title: string
  size?: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * @description
 *
 * Title component. Renders a title with a specific size.
 *
 * ---
 *
 * @example ```tsx
 * <Title title="Hello World" size={2} />
 * <Title title="Hello World" size={3} />
 * // Renders
 * // <h2>Hello World</h2>
 * // <h3>Hello World</h3>
 * ```
 *
 * ---
 * @see {@link [Tests](../../__tests__/Title.test.tsx)}
 * @see {@link TitleProps}
 * @param {TitleProps} props
 * @returns {JSX.Element}
 */
export function Title({ title, size = 2 }: TitleProps): JSX.Element {
  const Tag = `h${size}` as keyof JSX.IntrinsicElements

  return (
    <Tag
      className="uppercase data-[size='2']:text-lg data-[size='3']:text-md data-[size='4']:text-md"
      data-size={size}
      aria-labelledby={title}
    >
      {title}
    </Tag>
  )
}
