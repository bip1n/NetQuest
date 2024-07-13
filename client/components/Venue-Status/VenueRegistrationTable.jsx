"use client"
import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Dropdown,DropdownTrigger,DropdownItem,DropdownMenu,Button} from "@nextui-org/react";
import {EditIcon} from "../Icons";
import {DeleteIcon} from "../Icons";
import {EyeIcon} from "../Icons";
import {columns, users} from "./data";

const statusColorMap = {
  active: "success",
  rejected: "danger",
  pending: "primary",
};

export const VenueRegistrationTable = () =>  {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "venueName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.location}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
          
            <Tooltip  content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Dropdown>
                    <DropdownTrigger>   
                      <Button isIconOnly>
                        <EditIcon />
                      </Button>                                       
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="new">New file</DropdownItem>
                      <DropdownItem key="copy">Copy link</DropdownItem>
                      <DropdownItem key="edit">Edit file</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" color="danger">
                        Delete file
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
       <Table removeWrapper  aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  )
}
