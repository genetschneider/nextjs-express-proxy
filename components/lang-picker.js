import Link from "next/link";
import { useRouter } from "next/router";
import { i18n } from "../next.config";

export const LangPicker = () => {
  const { asPath } = useRouter();

  return i18n.locales.map((l) => {
    return (
      <div key={l}>
        <Link href={asPath} locale={l}>
          {l}
        </Link>
        <br />
      </div>
    );
  });
};
