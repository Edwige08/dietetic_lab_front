import Title from "@/components/Title";
import TitleTwo from "@/components/TitleTwo";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <Title
                text="Foire aux Questions"
            />
            <div className="flex flex-col p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl text-justify">
                <TitleTwo text="Je ne comprends pas ce qui est écrit dans cette FAQ. Pourquoi&nbsp;?" />
                <p>
                    Ne vous inquiétez pas, c&apos;est normal. Cette page est encore en cours de construction. Le texte que vous lisez est du <span className="italic">lorem ipsum</span>. C&apos;est une suite de mots sans signification que j&apos;utilise pour la mise en page. Il sera bientôt transformé en une vraie FAQ.
                </p>
                <br />
                <TitleTwo text="Ma question n°2 de la FAQ&nbsp;?" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra mauris a dictum scelerisque. Aenean id suscipit nunc. Donec convallis nunc nec ex suscipit vulputate. Ut tempor magna vel imperdiet scelerisque. Nam pulvinar mauris vel accumsan tristique. Quisque vehicula tortor risus, et venenatis nulla condimentum id. Donec vitae est lacus. Nunc pretium purus ac velit maximus gravida.
                </p>
                <br />
                <TitleTwo text="Ma question n°3 de la FAQ&nbsp;?" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra mauris a dictum scelerisque. Aenean id suscipit nunc. Donec convallis nunc nec ex suscipit vulputate. Ut tempor magna vel imperdiet scelerisque. Nam pulvinar mauris vel accumsan tristique. Quisque vehicula tortor risus, et venenatis nulla condimentum id. Donec vitae est lacus. Nunc pretium purus ac velit maximus gravida.
                </p>
                <br />
                <TitleTwo text="Ma question n°4 de la FAQ&nbsp;?" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra mauris a dictum scelerisque. Aenean id suscipit nunc. Donec convallis nunc nec ex suscipit vulputate. Ut tempor magna vel imperdiet scelerisque. Nam pulvinar mauris vel accumsan tristique. Quisque vehicula tortor risus, et venenatis nulla condimentum id. Donec vitae est lacus. Nunc pretium purus ac velit maximus gravida.
                </p>
            </div>
        </div>
    )
}