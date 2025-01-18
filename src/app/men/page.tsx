import Link from "next/link";

const MenPage = () => {
  const subcategories = ["shampoo", "face-Wash", "Rings" ,"Watches", "Bracelets"];

  return (
    <div>
      <h1>Men Categories</h1>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory}>
            <Link href={`/men/${subcategory}`}>
              <button>{subcategory.toUpperCase()}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenPage;
