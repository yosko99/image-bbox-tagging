import ILabel from '../interfaces/Ilabel';

const fillFormDataWithLabelInfo = (
  formData: FormData,
  file: File,
  labels: ILabel[],
  message: string
) => {
  formData.set('image', file);
  formData.set('message', message);
  for (let i = 0; i < labels.length; i++) {
    formData.set(`coordinates[${i}][width]`, labels[i].width.toString());
    formData.set(`coordinates[${i}][height]`, labels[i].height.toString());
    formData.set(`coordinates[${i}][x]`, labels[i].x.toString());
    formData.set(`coordinates[${i}][y]`, labels[i].y.toString());
    formData.set(`coordinates[${i}][label]`, labels[i].label);
  }
};

export default fillFormDataWithLabelInfo;
