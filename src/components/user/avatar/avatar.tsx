import { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import styles from './avatar.module.scss';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  alt?: string;
}

export default function Avatar({ src, name, size = 96, alt }: AvatarProps) {
  const [errored, setErrored] = useState(false);

  const dimensionStyle: React.CSSProperties = { width: size, height: size };

  return (
    <div className={styles.avatar} style={dimensionStyle} aria-label={alt || name || 'Avatar'}>
      {src && !errored ? (
        <img
          className={styles.img}
          src={src}
          alt={alt || `${name || 'user'} avatar`}
          onError={() => setErrored(true)}
        />
      ) : (
        <span className={styles.fallback} aria-hidden>
          <UserIcon size={24} />
        </span>
      )}
    </div>
  );
}


