/** @jsxImportSource @emotion/react */
import '@emotion/react';

import { ThemeType } from '@/utils/theme';

declare module '@emotion/react' {
  // eslint-disable-next-line
  export interface Theme extends ThemeType {}
}
