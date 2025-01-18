import Link from "next/link";

const HomePage = () => {
  const categories = ["Women", "Men", "Kids", "Customize"];

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/${category.toLowerCase()}`}>
              <button>{category}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;