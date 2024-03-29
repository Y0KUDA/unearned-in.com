import * as React from "react";
import { GatsbyLinkProps } from "gatsby-link";
import { Card, List } from "semantic-ui-react";
import { MarkdownRemarkGroupConnection } from "../../graphql-types";
import { kebabCase } from "lodash";

interface TagsCardProps extends React.HTMLProps<HTMLDivElement> {
  tags: MarkdownRemarkGroupConnection[];
  Link: React.ComponentClass<GatsbyLinkProps<any>>;
  tag?: string;
}

export default (props: TagsCardProps) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          Tags
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <List>
          {
            props.tags.sort((tagA: any, tagB: any) => {
              if (tagA.totalCount > tagB.totalCount) { return -1; }
              if (tagA.totalCount < tagB.totalCount) { return 1; }
              return 0;
            }).map((tag) => {
            const isActive = tag.fieldValue === props.tag;
            const activeStyle = {
              fontWeight: "700",
            };
            const tagLink = isActive ? `/` : `/blog/tags/${kebabCase(tag.fieldValue)}/`;
            return (
              <List.Item as="span" key={tag.fieldValue}>
                <List.Icon name="tag" color={isActive ? "blue" : null} />
                <List.Content style={isActive ? activeStyle : null}>
                  <props.Link to={tagLink}>
                    {tag.fieldValue} ({tag.totalCount})
                  </props.Link>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Card.Content>
    </Card>
  );
};
