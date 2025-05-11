import Book from '../models/Book.js';
import Review from '../models/Review.js';

const booksData = [
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description: 'An epic fantasy novel that follows the quest to destroy the One Ring, a powerful artifact created by the Dark Lord Sauron. The story takes place in the fictional world of Middle-earth and follows hobbits, elves, dwarves, and men in their struggle against the forces of darkness.',
    coverImage: 'https://images.pexels.com/photos/3646105/pexels-photo-3646105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    averageRating: 4.5
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'Set in the American South during the 1930s, the novel tells the story of a lawyer, Atticus Finch, who defends a Black man falsely accused of raping a white woman. The story is told through the eyes of Finch\'s young daughter, Scout, and addresses issues of racism, injustice, and moral growth.',
    coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    averageRating: 4.3
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel set in a totalitarian society where citizens are under constant surveillance by the government, led by Big Brother. The story follows Winston Smith, a civil servant tasked with rewriting history to align with the Party\'s ever-changing version of events, as he rebels against the system.',
    coverImage: 'https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    averageRating: 4.1
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel that follows the emotional development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness. The comedy of the writing lies in the depiction of manners, education, marriage, and money in the British Regency.',
    coverImage: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    averageRating: 4.2
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'Set in the Jazz Age on Long Island, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan. The novel explores themes of decadence, idealism, resistance to change, social upheaval, and excess.',
    coverImage: 'https://images.pexels.com/photos/775998/pexels-photo-775998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    averageRating: 4.0
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'The story follows the quest of Bilbo Baggins, a homebody hobbit who is swept into an epic adventure by the wizard Gandalf and a company of thirteen dwarves to reclaim the Lonely Mountain and its treasure from the dragon Smaug. Along the way, Bilbo encounters trolls, goblins, and the creature Gollum, from whom he acquires a magical ring.',
    coverImage: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    averageRating: 4.4
  }
];

const reviewsData = [
  {
    bookTitle: 'The Lord of the Rings',
    userName: 'BookLover42',
    rating: 5,
    comment: 'A true masterpiece of fantasy literature. The world-building is unparalleled and the characters are unforgettable. I've read it multiple times and find something new to appreciate each time.'
  },
  {
    bookTitle: 'The Lord of the Rings',
    userName: 'FantasyReader',
    rating: 4,
    comment: 'Epic scope and amazing characters. Sometimes the pacing is a bit slow, but the payoff is worth it. The friendship between Sam and Frodo is one of the best parts.'
  },
  {
    bookTitle: 'To Kill a Mockingbird',
    userName: 'LiteraryFan',
    rating: 5,
    comment: 'This book should be required reading for everyone. The lessons about empathy and standing up for what's right are as relevant today as they were when it was written. Atticus Finch is the moral compass we all need.'
  },
  {
    bookTitle: '1984',
    userName: 'DystopiaEnthusiast',
    rating: 4,
    comment: 'Chilling and prophetic. Orwell's vision of a surveillance state feels more relevant with each passing year. The ending is devastating but necessary.'
  },
  {
    bookTitle: 'Pride and Prejudice',
    userName: 'ClassicsReader',
    rating: 5,
    comment: 'Jane Austen's wit and sharp social commentary shine in this perfect romance. Elizabeth Bennet is one of literature's most delightful heroines, and her relationship with Darcy has defined the enemies-to-lovers trope for generations.'
  },
  {
    bookTitle: 'The Great Gatsby',
    userName: 'LiteraryScholar',
    rating: 4,
    comment: 'Fitzgerald's prose is like poetry, and his portrayal of the Jazz Age is both seductive and damning. Gatsby's pursuit of the American Dream is both inspiring and cautionary.'
  },
  {
    bookTitle: 'The Hobbit',
    userName: 'MiddleEarthFan',
    rating: 5,
    comment: 'More accessible than The Lord of the Rings but just as enchanting. Bilbo's journey from reluctant burglar to hero is perfectly paced, and the world is rich with wonder. A perfect introduction to fantasy literature.'
  },
  {
    bookTitle: 'The Hobbit',
    userName: 'AdventureSeeker',
    rating: 4,
    comment: 'A wonderful adventure story with memorable characters. The riddle game with Gollum is one of the most tense and well-written scenes in all of literature. Perfect for readers of all ages.'
  }
];

export const seedDatabase = async () => {
  try {
    // Check if we need to seed data
    const booksCount = await Book.countDocuments();
    
    if (booksCount === 0) {
      console.log('Seeding database with initial data...');
      
      // Insert books
      const insertedBooks = await Book.insertMany(booksData);
      console.log(`${insertedBooks.length} books inserted.`);
      
      // Create a map of book titles to IDs
      const bookMap = {};
      insertedBooks.forEach(book => {
        bookMap[book.title] = book._id;
      });
      
      // Prepare reviews with proper book IDs
      const reviewsToInsert = reviewsData.map(review => ({
        bookId: bookMap[review.bookTitle],
        userName: review.userName,
        rating: review.rating,
        comment: review.comment
      }));
      
      // Insert reviews
      const insertedReviews = await Review.insertMany(reviewsToInsert);
      console.log(`${insertedReviews.length} reviews inserted.`);
      
      console.log('Database seeded successfully.');
    } else {
      console.log('Database already contains data, skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};