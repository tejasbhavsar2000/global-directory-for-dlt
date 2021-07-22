import { buildGraph } from "../../lib/resolvePaths";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TreeItem } from "@material-ui/lab";
import Styles from "../../styles/taxanomy.module.css";
import { Style } from "@material-ui/icons";
import Link from "next/link";

const getTreeItemsFromData = (treeItems) => {
  // console.log(JSON.stringify(treeItems.treeItems.children));
  // return "h";
  console.log(treeItems);
  return treeItems.map((treeItemData) => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
      return (
        <TreeItem
          key={treeItemData.id}
          nodeId={treeItemData.id}
          label={treeItemData.name.slice(
            treeItemData.name.lastIndexOf(`${"\\"}`) + 1,
            treeItemData.name.length
          )}
          children={children}
        />
      );
    } else {
      return (
        <Link
          href={`taxanomy/${treeItemData.name.slice(
            treeItemData.name.lastIndexOf(`${"\\"}`) + 1,
            treeItemData.name.length
          )}`}
        >
          <TreeItem
            onClick={() => {}}
            key={treeItemData.id}
            nodeId={treeItemData.id}
            label={treeItemData.name.slice(
              treeItemData.name.lastIndexOf(`${"\\"}`) + 1,
              treeItemData.name.length
            )}
            children={children}
          />
        </Link>
      );
    }
  });
};
const DataTreeView = (treeItems) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {console.log(treeItems)}
      {getTreeItemsFromData(treeItems.treeItems.children)}
    </TreeView>
  );
};

function taxonomy({ items }) {
  return (
    <div className={Styles.container}>
      {console.log(items)}
      <h1 className={Styles.title}>Taxanomy</h1>
      <main className={Styles.main}>
        <DataTreeView treeItems={items} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const files = buildGraph("public/taxanomy");

  return {
    props: {
      items: files,
    },
  };
}
export default taxonomy;
