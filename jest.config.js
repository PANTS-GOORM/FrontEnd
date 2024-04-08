module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Babel을 통한 파일 변환
  },
  transformIgnorePatterns: [ // "node_modules" 폴더를 제외하고 변환
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],
};
