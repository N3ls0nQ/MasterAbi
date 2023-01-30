import useData from "./UserContext";

export const useCalculations = () => {
  const { subjects, setUser, user } = useData();

  const setSemesterAverage = async (semester: number) => {
    let count = 0;
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      count += subject.semesters[semester].average;
    }

    count /= subjects.length;

    console.info(count)

    switch (semester) {
      case 1:
        setUser({
          ...user,
          average1: count,
        });
        break;
      case 2:
        setUser({
          ...user,
          average2: count,
        });
        break;
      case 3:
        setUser({
          ...user,
          average3: count,
        });
        break;
      case 4:
        setUser({
          ...user,
          average4: count,
        });
        break;
      default:
        break;
    }
  };

  return { setSemesterAverage };
};

// const userSetup = {
//   name: "username",
//   doNotifications: true,
//   showSemester: 1,
//   average1: 12,
//   average2: 14,
//   average3: "-",
//   average4: "-",
//   state: value,
// };
