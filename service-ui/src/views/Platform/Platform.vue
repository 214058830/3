<template>
  <div>
    <Card style="margin-top: 10px">
      <List>
        <ListItem>
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            title="This is title"
            description="This is description, this is description."
          />
        </ListItem>
        <ListItem>
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            title="This is title"
            description="This is description, this is description."
          />
        </ListItem>
        <ListItem>
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            title="This is title"
            description="This is description, this is description."
          />
          <template slot="action">
            <li>
              <a href>Edit</a>
            </li>
            <li>
              <a href>More</a>
            </li>
          </template>
        </ListItem>
        <ListItem>
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            title="This is title"
            description="This is description, this is description."
          />
          <template slot="action">
            <li>
              <a href>Edit</a>
            </li>
            <li>
              <a href>More</a>
            </li>
          </template>
        </ListItem>
      </List>
    </Card>
    <div style="text-align: center; ">
      <Page
        style="margin-top: 20px;"
        :total="this.page.total"
        :current="this.page.number"
        :page-size="this.page.size"
        show-sizer
        show-elevator
        show-total
        @on-change="changePageNumber"
        @on-page-size-change="changePageSize"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        number: 1,
        size: 10,
        total: 0
      }
    };
  },
  methods: {
    changePageNumber(num) {
      this.page.number = num;
      // this.updataTable();
    },
    // updataTable() {
    //   this.data = [];
    //   if (this.user_amount.length >= this.page.number * this.page.size) {
    //     this.data = this.user_amount.slice(
    //       (this.page.number - 1) * this.page.size,
    //       this.page.number * this.page.size
    //     );
    //   } else {
    //     this.data = this.user_amount.slice(
    //       (this.page.number - 1) * this.page.size
    //     );
    //   }
    // },
    changePageSize(size) {
      this.page.size = size;
      // this.updataTable();
    }
  }
};
</script>
