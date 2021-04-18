import React from 'react';
import './App.scss';

const slideWidth = 30;

const _items = [
    {
        product: {
            title: 'The Cat Eyes',
            price: '$15',
            image: 'https://i.postimg.cc/VLsSQBNb/sunglass3.jpg',
            category: 'SUNGLASSES'
        }
    },
    {
        product: {
            title: "Wafer Glasses",
            price: "$19",
            image: 'https://i.postimg.cc/G3xB5SbC/sunglass2.jpg',
            category: 'SUNGLASSES'
        }
    },
    {
        product: {
            title: 'Oval Sun glasses',
            price: '$14',
            image: 'https://i.postimg.cc/63s7Dk79/sunglass1.jpg',
            category: 'SUNGLASSES'
        }
    },
    {
      product: {
          title: 'Perfume',
          price: '$20',
          image: 'https://i.postimg.cc/bv34ZPhT/rosy-h-nguyen-5-Hrl-EGTsa-B4-unsplash.jpg',
          category: 'COSMETICS'
      }
    },
    {
      product: {
          title: 'Lipstick',
          price: '$10',
          image: 'https://i.postimg.cc/6qGPbGGj/sebastian-santacruz-WXUb-Xl5-ODA4-unsplash.jpg',
          category: 'COSMETICS'
      }
    },
    {
      product: {
          title: 'Makeup Backgrounds',
          price: '$30',
          image: 'https://i.postimg.cc/bY7YyxLv/element5-digital-ce-Wg-SMd8rv-Q-unsplash.jpg',
          category: 'COSMETICS'
      }
    },
    {
      product: {
          title: 'Beauty Flatlay',
          price: '$50',
          image: 'https://i.postimg.cc/5N846XkS/johanne-kristensen-1-A5h-Sv-PZj-Mc-unsplash.jpg',
          category: 'COSMETICS'
      }
    },
    {
      product: {
          title: 'Foundation',
          price: '$18',
          image: 'https://i.postimg.cc/Z5ZT3JGt/karly-jones-x-Bq-YLn-Rhfa-I-unsplash.jpg',
          category: 'COSMETICS'
      }
    }

];

const categories = ['SUNGLASSES','COSMETICS']

_items.push(..._items);


const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


const filterDropdownValues = () => {
  return categories.map(category=>{
    return <option value={category}>{category}</option>;
  })
}

const keys = Array.from(Array(_items.length).keys());
const Carousel = () => {
    const [items, setItems] = React.useState(keys);
    const [isTicking, setIsTicking] = React.useState(false);
    const [activeIdx, setActiveIdx] = React.useState(0);
    const [refinedItems, setfilterItems] = React.useState(_items);
    
    const [length,setLength] = React.useState(_items.length/2);
    const bigLength = refinedItems.length;

    const widthBasedOnCount = (length + 0.5) * slideWidth * 2 + 'rem';
    const [widthCal, setDynamicWidth] = React.useState(widthBasedOnCount);
    const createItem = (position, idx) => {
      console.log(position,length);
      const item = {
          styles: {
              transform: `translateX(${position * slideWidth}rem)`,
          },
          product: refinedItems[idx].product,
      };
  
      switch (position) {
          case length - 1:
          case length + 1:
              item.styles = {...item.styles, height:'60%', top:'10%'};
              break;
          case length:
              item.styles = {...item.styles, border:'black solid'};
              break;
          default:
              item.styles = {...item.styles, opacity: 0};
              break;
      }
  
      return item;
  };
  
  const CarouselSlideItem = ({pos, idx, activeIdx}) => {
      const item = createItem(pos, idx, activeIdx);
  
      return (
          <li className="carousel__slide-item" style={item.styles}>
              <div className="carousel__slide-item-img-link">
                  <img src={item.product.image} alt={item.product.title} />
              </div>
              <div className="carousel-slide-item__body">
                  <h4>{item.product.title}</h4>
                  <p>Price: <b>{item.product.price}</b></p>
                  <p className="carosel__category">{item.product.category}</p>
              </div>
          </li>
      );
  };

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => {
              console.log(prev.map((_, i) => prev[(i + jump) % bigLength]))
                return prev.map((_, i) => prev[(i + jump) % bigLength]);
            });
        }
    };

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev) => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength],
                );
            });
        }
    };

    const handleOnChange = event => {
      const selectedVal = event.target.value;
      let filteredItems = _items.filter(item => (item.product.category === selectedVal || selectedVal === ''));
      console.log(filteredItems);
      let newArr = Array.from(Array(filteredItems.length).keys());
      
      let updatedWidthStyle = (filteredItems.length/2 + 0.5) * slideWidth * 2 + 'rem';
      
      setfilterItems(filteredItems);
      setItems(newArr);
      setLength(newArr.length/2);
      setDynamicWidth(updatedWidthStyle)
      console.log(items,updatedWidthStyle,widthCal);
    };

    React.useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    React.useEffect(() => {
        setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    }, [items]);

    return (
      <React.Fragment>
        <div className="carousel__select">
          <label>Select Category</label>
          <div className="select">
            <select id="standard-select"  onChange={handleOnChange}>
              <option value="">ALL</option>
                {filterDropdownValues()}
            </select>
          </div>
          </div>
          <div className="carousel__wrap">
            
            <div className="carousel__inner">
                <button
                    className="carousel__btn carousel__btn--prev"
                    onClick={() => prevClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--left" />
                </button>
                <div className="carousel__container">
                    <ul className="carousel__slide-list" style={{width:widthCal}}>
                        {items.map((pos, i) => (
                            <CarouselSlideItem
                                key={i}
                                idx={i}
                                pos={pos}
                                activeIdx={activeIdx}
                            />
                        ))}
                    </ul>
                </div>
                <button
                    className="carousel__btn carousel__btn--next"
                    onClick={() => nextClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--right" />
                </button>
            </div>
        </div>
    
      </React.Fragment>
        );
};

export default Carousel;