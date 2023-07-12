import products from "../utils/products";
import Card from "./Card";

export default function Cards(props) {
    return (
        <div>
            {
                products.map(
                    product => (
                        <Card
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            image={product.image}
                            stock={product.stock}
                            condition={product.condition}
                            price={product.price}
                        />
                    )
                )
            }
        </div>
    )
}