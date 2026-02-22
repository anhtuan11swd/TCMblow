import { useParams } from "react-router-dom";

const Description = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      {/* Tiêu đề blog - text-2xl, font-semibold */}
      <h1 className="font-semibold text-gray-900 text-2xl">
        Tiêu đề bài viết - ID: {id}
      </h1>

      {/* Hình ảnh - w-full, h-[400px], margin-top-4 */}
      <img
        alt="Blog visual content"
        className="mt-4 rounded-lg w-full h-[400px] object-cover"
        src="/temp.jpg"
      />

      {/* Nội dung chi tiết - Lorem Ipsum với margin-top-4 */}
      <div className="mt-4 text-gray-700 leading-relaxed">
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <p className="mt-4">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
          omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

        <p className="mt-4">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
          sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
          tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem.
        </p>

        <p className="mt-4">
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?
        </p>
      </div>
    </div>
  );
};

export default Description;
