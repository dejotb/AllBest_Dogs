import { addImgUrl } from './model.js';
import { createMarkup } from './views.js';

export async function generateMarkup(dogs) {
  dogs.map((dog) => createMarkup(dog));
}
export async function getImgUrl(dogs) {
  await dogs.map((dog) => addImgUrl(dog, dog.imgId));
  console.log(dogs);
}
