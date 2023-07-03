const generateUniqueId = () => {
  const timestamp: number = new Date().getTime();
  const randomNum: number = Math.floor(Math.random() * 1000000);
  const uniqueId: string = `${timestamp}-${randomNum}`;
  return uniqueId;
};

export default generateUniqueId;
