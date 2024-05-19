import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc, 
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAHWirBJ35COUqXvh2QeHoOGSFYiHQfMwI",
  authDomain: "moviereview-408f6.firebaseapp.com",
  projectId: "moviereview-408f6",
  storageBucket: "moviereview-408f6.appspot.com",
  messagingSenderId: "450375585144",
  appId: "1:450375585144:web:c65b788410784f8c6c0c8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


var movies = [];
// const keys = [];
const qt = query(collection(db, "Movies"), orderBy("name"));
const snapshot = await getDocs(qt);
snapshot.forEach((doc) => {
    const movieData = doc.data();
    // console.log("Movie:",movieData.name);
    movies.push(movieData.name);
})

// Function to search for movies
// const searchMovie = async () => {
//   const searchValue = document
//     .getElementById("default-search")
//     .value.trim()
//     .toLowerCase();

//   // If the search value is empty, reload all movies
//   if (searchValue === "") {
//     const q = query(collection(db, "Movies"), orderBy("name"));
//     const snapshot = await getDocs(q);
//     renderMovies(snapshot);
//     return;
//   }
  
// //   var indices = [];
// //   movies.forEach(function(item, index) {
// //     if (item.toLowerCase().includes(searchValue)) {
// //         indices.push(index);
// //     }
// //     });
    
//     var results = movies.filter(function(item) {
//         return item.toLowerCase().includes(searchValue);
//     });
//     // console.log(results);
//     const moviesList = document.getElementById("movies-list");
//     moviesList.innerHTML = ""; // Clear previous search results
//     results.forEach((nam) => {
//       const q = query(
//             collection(db, "Movies"),
//             orderBy("name"),
//             where("name", "==", nam)
//           );
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//     renderMoviesSearch(snapshot);
    
//     });
//     })
    
// //   const q = query(
// //     collection(db, "Movies"),
// //     orderBy("name"),
// //     where("name", "==", searchValue)
// //   );

// //   const snapshot = await getDocs(q);
// };

const searchMovie = async () => {
  const searchValue = document
    .getElementById("default-search")
    .value.trim()
    .toLowerCase();

  // If the search value is empty, reload all movies
  if (searchValue === "") {
    const q = query(collection(db, "Movies"), orderBy("name"));
    const snapshot = await getDocs(q);
    renderMovies(snapshot);
    return;
  }

  // Filter movies based on search value
  const results = movies.filter(item =>
    item.toLowerCase().includes(searchValue)
  );

  // Clear previous search results
  const moviesList = document.getElementById("movies-list");
  moviesList.innerHTML = "";

  // Render search results
  results.forEach(async name => {
    const q = query(
      collection(db, "Movies"),
      orderBy("name"),
      where("name", "==", name)
    );
    const snapshot = await getDocs(q);
    renderMoviesSearch(snapshot);
  });
};


const sortRate = async () => {
  const q = query(collection(db, "Movies"), orderBy("rating"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    renderMovies(snapshot);
  });
};
const sortName = async () => {
  const q = query(collection(db, "Movies"), orderBy("name"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    renderMovies(snapshot);
  });
};
const sortDirector = async () => {
  const q = query(collection(db, "Movies"), orderBy("director"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    renderMovies(snapshot);
  });
};
const sortDate = async () => {
  const q = query(collection(db, "Movies"), orderBy("releaseDate"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    renderMovies(snapshot);
  });
};

// Function to render movies based on snapshot data
const renderMovies = (snapshot) => {
  const moviesList = document.getElementById("movies-list");
  moviesList.innerHTML = ""; // Clear previous search results

  snapshot.forEach((doc) => {
    const movieData = doc.data();
    // console.log("Movie:",movieData.name);
    // movies.push(movieData.name);
    // keys.push(doc.id)
    const movieId = doc.id;
    // console.log(movies);
    const tableRow = `
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
          
            ${movieData.name}


          </th>
          <td class="px-6 py-4">
            ${movieData.rating}
          </td>
          <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
            ${movieData.director}
          </td>
          <td class="px-6 py-4">
            ${movieData.releaseDate}
          </td>
          <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 editBtn" data-id="${movieId}">Edit</button>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 deleteBtn" data-id="${movieId}">Delete</button>
          </td>
        </tr>
      `;
    moviesList.innerHTML += tableRow;
  });
};

const renderMoviesSearch = (snapshot) => {
    const moviesList = document.getElementById("movies-list");
  
    snapshot.forEach((doc) => {
      const movieData = doc.data();
      // console.log("Movie:",movieData.name);
      // movies.push(movieData.name);
      // keys.push(doc.id)
      // console.log(movies);
      const movieId = doc.id;
      const tableRow = `
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
          
            ${movieData.name}


          </th>
          <td class="px-6 py-4">
            ${movieData.rating}
          </td>
          <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
            ${movieData.director}
          </td>
          <td class="px-6 py-4">
            ${movieData.releaseDate}
          </td>
          <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 editBtn" data-id="${movieId}">Edit</button>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 deleteBtn" data-id="${movieId}">Delete</button>
          </td>
        </tr>
      `;
      moviesList.innerHTML += tableRow;
    });
  };

// Get a live data snapshot (i.e. auto-refresh) of our Movies collection
const q = query(collection(db, "Movies"), orderBy("name"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  renderMovies(snapshot);
});

// Add event listener for search input change
// document.getElementById('default-search').addEventListener('onchange', searchMovie);
// $('#movies-List').on('click', '.editBtn', function() {
//   const movieId = $(this).data('id');
//   // deleteBook(bookId);
//   console.log(movieId);
// });

 // Function to handle adding new books and reviews


 const deleteMovie = async (movieId) => {
  try {
      await deleteDoc(doc(db, "Movies", movieId));
  } catch (error) {
      console.error("Error deleting document: ", error);
  }
  };

 const addMovie = async () => {

  const MovieName = $('#movieNameInput').val();
  const MovieRating = parseInt($('#movieRatingInput').val());
  const DirectorName = $('#directorNameInput').val();
  const ReleaseName = $('#releaseDateInput').val();

  try {
      await addDoc(collection(db, "Movies"), {
        name: MovieName,
        rating: MovieRating,
        releaseDate: ReleaseName,
        director: DirectorName
      });
      $('#movieNameInput').val('');
      $('#movieRatingInput').val('');
      $('#directorNameInput').val('');
      $('#releaseDateInput').val('');
  } catch (error) {
      console.error("Error adding document: ", error);
  }
};


// Update event listener for edit button click

const editMovie = async (movieId) => {
  // Retrieve current book details
  const docRef = doc(db, "Movies", movieId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      const movieData = docSnap.data();
      // Populate input fields with current book details
      $('#movieNameInput').val(movieData.name);
      $('#movieRatingInput').val(movieData.rating);
      $('#directorNameInput').val(movieData.director);
      $('#releaseDateInput').val(movieData.releaseDate);

      // Update button text and action
      $('#addMovieBtn').text('Update Movie').off('click').on('click', async () => {
          const newMovieName = $('#movieNameInput').val();
          const newMovieRating = parseInt($('#movieRatingInput').val());
          const newDirectorName = $('#directorNameInput').val();
          const newReleaseName = $('#releaseDateInput').val();


          try {
              await setDoc(doc(db, "Movies", movieId), {
                  name: newMovieName,
                  rating: newMovieRating,
                  releaseDate: newReleaseName,
                  director: newDirectorName
              }, { merge: true }); // Merge with existing document
              // Reset input fields and button text
              $('#movieNameInput').val('');
              $('#movieRatingInput').val('');
              $('#directorNameInput').val('');
              $('#releaseDateInput').val('');
              $('#addMovieBtn').text('Add Movie').off('click').on('click', addMovie);
          } catch (error) {
              console.error("Error updating document: ", error);
          }
      });
  }
};

 // Event delegation for edit buttons
 $('#movies-list').on('click', '.editBtn', function() {
  const movieId = $(this).data('id');
  editMovie(movieId);
});

// Event delegation for delete buttons
$('#movies-list').on('click', '.deleteBtn', function() {
  const movieId = $(this).data('id');
  deleteMovie(movieId);
});




$('#addMovieBtn').on('click', addMovie);
$("#default-search").on("input", searchMovie);
$("#rateSort").on("click", sortRate);
$("#nameSort").on("click", sortName);
$("#directorSort").on("click", sortDirector);
$("#releaseDateSort").on("click", sortDate);

