import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Tooltip, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatNumber, getPercentageClass } from "../utils/format-utils";
import { tokens } from "../data/token-data";

interface TokenTableProps {
  onTokenSelect?: (tokenId: string) => void;
}

export const TokenTable = ({ onTokenSelect }: TokenTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table 
        aria-label="Cryptocurrency tokens table"
        removeWrapper
        className="min-w-full compact-table"
        selectionMode="single"
        onRowAction={(key) => onTokenSelect && onTokenSelect(key as string)}
      >
        <TableHeader>
          <TableColumn className="text-xs w-[40px]">#</TableColumn>
          <TableColumn className="text-xs">TOKEN</TableColumn>
          <TableColumn className="text-xs text-right">PRICE</TableColumn>
          <TableColumn className="text-xs text-right hidden md:table-cell">AGE</TableColumn>
          <TableColumn className="text-xs text-right hidden lg:table-cell">TXNS</TableColumn>
          <TableColumn className="text-xs text-right hidden lg:table-cell">VOLUME</TableColumn>
          <TableColumn className="text-xs text-right hidden md:table-cell">1H</TableColumn>
          <TableColumn className="text-xs text-right">6H</TableColumn>
          <TableColumn className="text-xs text-right hidden sm:table-cell">24H</TableColumn>
          <TableColumn className="text-xs text-right hidden xl:table-cell">LIQUIDITY</TableColumn>
        </TableHeader>
        <TableBody>
          {tokens.map((token, index) => (
            <TableRow key={token.id} className="token-row cursor-pointer">
              <TableCell className="text-xs">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {token.chain === "ETH" && (
                      <Avatar
                        src="https://img.heroui.chat/image/avatar?w=32&h=32&u=eth"
                        className="w-3 h-3 -mr-1 z-10"
                        radius="full"
                      />
                    )}
                    {token.chain === "SOL" && (
                      <Avatar
                        src="https://img.heroui.chat/image/avatar?w=32&h=32&u=sol"
                        className="w-3 h-3 -mr-1 z-10"
                        radius="full"
                      />
                    )}
                    <Avatar
                      src={token.image}
                      className="w-5 h-5"
                      radius="sm"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-xs">{token.symbol}</span>
                      <span className="text-[10px] text-default-400">/{token.chain}</span>
                    </div>
                    <p className="text-[10px] text-default-400">{token.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div>
                  <p className="text-xs font-medium">${token.price}</p>
                  {token.priceUsd && <p className="text-[10px] text-default-400">${token.priceUsd}</p>}
                </div>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                <span className="text-xs">{token.age}</span>
              </TableCell>
              <TableCell className="text-right hidden lg:table-cell">
                <span className="text-xs">{formatNumber(token.transactions)}</span>
              </TableCell>
              <TableCell className="text-right hidden lg:table-cell">
                <span className="text-xs">${formatNumber(token.volume)}</span>
              </TableCell>
              <TableCell className={`text-right hidden md:table-cell ${getPercentageClass(token.change1h)}`}>
                <span className="text-xs">{token.change1h}%</span>
              </TableCell>
              <TableCell className={`text-right ${getPercentageClass(token.change6h)}`}>
                <span className="text-xs">{token.change6h}%</span>
              </TableCell>
              <TableCell className={`text-right hidden sm:table-cell ${getPercentageClass(token.change24h)}`}>
                <span className="text-xs">{token.change24h}%</span>
              </TableCell>
              <TableCell className="text-right hidden xl:table-cell">
                <span className="text-xs">${formatNumber(token.liquidity)}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};