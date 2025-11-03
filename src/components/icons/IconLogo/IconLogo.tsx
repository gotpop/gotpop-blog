import { getInlineStyles } from "@/utils/inline-styles"

export function IconLogo() {
  const styles = getInlineStyles("IconLogo.css")

  return (
    <div className="circles">
      {styles && <style>{styles}</style>}
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  )
}
