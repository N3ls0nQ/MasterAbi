export const getSemesterAveragePoints = (subjects) => {
  let weighting = 0.5;
  let count = 0;
  let totalGrades = 0;

  //   for (let i = 0; i < subjects.length; i++) {
  //     switch (subjects[i].weighting) {
  //       case "1-1":
  //         weighting = 0.5;
  //         break;
  //       case "2-1":
  //         weighting = 0.66;
  //         break;
  //       case "3-1":
  //         weighting = 0.75;
  //         break;
  //       case "3-2":
  //         weighting = 0.6;
  //         break;
  //       default:
  //         weighting = 0.5;
  //         break;
  //     }

  //     for (let n = 0; n < subjects[i].semesters.length; n++) {
  //       for (let x = 0; x < subjects[i].semesters[n].grades.length; x++) {
  //         console.log(subjects[i].semesters[n].grades[x].value);
  //         if (subjects[i].semesters[n].grades[x].value === "-") return;
  //         if (subjects[i].semesters[n].grades[x].type === "mündlich") {
  //           //1 - weighting, da mündlich
  //           count += subjects[i].semesters[n].grades[x].type * (1 - weighting);
  //         } else {
  //           count += subjects[i].semesters[n].grades[x].type * weighting;
  //         }
  //         totalGrades++;
  //       }
  //     }
  //     return count / totalGrades;
  //   }

  for (let i = 0; i < subjects.length; i++) {
    switch (subjects[i].weighting) {
      case "1-1":
        weighting = 0.5;
        break;
      case "2-1":
        weighting = 0.66;
        break;
      case "3-1":
        weighting = 0.75;
        break;
      case "3-2":
        weighting = 0.6;
        break;
      default:
        weighting = 0.5;
        break;
    }

    for (let n = 0; n < subjects[i].semesters.length; n++) {
      for (let x = 0; x < subjects[i].semesters[n].grades.length; x++) {
        if (isNaN(subjects[i].semesters[n].grades[x].value)) return;
        if (subjects[i].semesters[n].grades[x].type === "mündlich") {
          //1 - weighting, da mündlich
          count += subjects[i].semesters[n].grades[x].value * (1 - weighting);
        } else {
          count += subjects[i].semesters[n].grades[x].value * weighting;
        }
        totalGrades++;
      }
    }
  }
  return count / totalGrades
};
