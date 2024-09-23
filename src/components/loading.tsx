interface LoadingCircleProps {
  size: 'small' | 'medium' | 'large'
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 30,
}
export const LoadingCircle: Component<LoadingCircleProps> = ({
  className,
  size,
}) => (
  <div
    className={className}
    style={{
      fontSize: sizeMap[size],
    }}
  >
    <i className="i-mingcute-loading-3-line animate-spin" />
  </div>
)
