import ILabel from './Ilabel';

interface ILabeledImage {
  message: string;
  imageURL: string;
  coordinates: ILabel[];
}

export default ILabeledImage;
