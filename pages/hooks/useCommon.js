import { titleObjs } from "../../public/file/pjTitlejson";

export default function useCommon() {
  function makeRandomNumber() {
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return random(1, 1000);
  }

  function fileChange(e) {
    setFile(e.target.files[0]);
  }

  function getH3Title(selectedConcept) {
    return titleObjs[selectedConcept];
  }

  return [
    makeRandomNumber,
    fileChange,
    getH3Title,
  ]
}