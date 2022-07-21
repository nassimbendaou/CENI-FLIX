export const getOneMonthAgoReleaseDate = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let formattedDate = date.toJSON().slice(0,10);

    return formattedDate;
}

export const dateToYearOnly = date => date.slice(0,4);

export const capitalizeFirstLetter = text => (
    text.charAt(0).toUpperCase() + text.slice(1)
);

export const randomize = data => (
    Math.floor(Math.random() * data.length - 1)
);

export const truncate = (text, n) => (
    text?.length > n ? text.substr(0, n - 1) + "..." : text
);
export const uuid=()=> {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  