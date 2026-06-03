import { useNavigate } from 'react-router-dom';
import { categories } from '../../api/mealApi';
import './Navigation.css';

export default function Navigation({ activeCategory, onCategoryChange }) {
  const navigate = useNavigate();

  const handleClick = (catId) => {
    if (onCategoryChange) {
      onCategoryChange(catId);
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <nav id="menu" className="category-nav">
      <div className="category-nav__inner container">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-nav__item ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleClick(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
