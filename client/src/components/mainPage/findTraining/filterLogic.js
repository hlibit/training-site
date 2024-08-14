export const dynamicFilterFunc = (trainings, param, query, searchNumQuery) => {
    if (!query && !searchNumQuery) {
      return trainings;
    }

    return trainings.filter((training) => {
      if (query && (param === "sports" || param === "level")) {
        return training[param].toLowerCase().includes(query.toLowerCase());
      }
      if (query && param === "trainers") {
        return (
          training[param][0].surname
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          training[param][0].name.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (searchNumQuery !== null && param === "energy") {
        return training.energy >= searchNumQuery;
      }
      if (searchNumQuery !== null && param === "duration") {
        return training.duration >= searchNumQuery;
      }

      return true;
    });
  };
  